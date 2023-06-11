import fs from 'fs';
import os from 'os';
import 'dotenv';

import { Router, Request, Response } from 'express';
import { uploadImage } from '../database/uploads';
import browser from 'browser-detect';

import { authenticate } from '../database/authenticate';

import { connection } from '../database/connection';
import { Accesses, User } from '../database/models/User';
import App from '../App';

class AuthenticateRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.post('/signin', async (req: Request, res: Response) => {
      const { email, password } = req.body;
      let username = email;

      if (!email || !password) return res.redirect('/');

      if (email.startsWith('@')) {
        const { data: search, error: errorSearch } = await connection.from('Users').select('*').match({ username: email }).limit(1);
        if (errorSearch) return res.status(500).redirect('/');

        if (!search.length) return res.redirect('/admin');
        username = search[0].email;
      }

      const user = await connection.auth.signIn({ email: username, password });
      if (!user) return res.redirect('/admin');

      const { body, error } = await connection.from("Users").select("*").match({ userId: user.user?.id }).limit(1);
      if (error) return res.status(500).json({ message: 'Usuário não encontrado', error });

      const userme = new User(body[0]);
      userme.setAccesses(new Accesses({
        date: new Date(),
        location: {
          country: req.ip,
          state: req.ip,
          city: req.ip,
          ip: req.socket.remoteAddress
        },
        browser: browser(req.headers['user-agent']).name,
        machine: os.hostname() + ' - ' + os.platform() + ' - ' + os.arch() + ' - ' + os.release()
      }))

      App.set('user', userme);

      const { error: errorUpdate } = await connection.from('Users').update(userme).match({ id: userme.getId() });
      if (errorUpdate) return res.status(500).json({ message: 'Usuário não atualizado', error: errorUpdate });
      return res.redirect('/admin');
    });

    this.router.post('/signup', uploadImage.single('cover'), async (req: Request, res: Response) => {
      const { email, password, name, username }: { email: string, password: string, name: string, username: string } = req.body;
      const file = req.file;

      if (!file) return res.status(500).json({ message: 'Imagem não encontrada', error: 'Error' });

      const { error, user } = await connection.auth.signUp({ email, password }, {
        data: {
          name,
          username
        }
      });

      if (error) res.status(500).json({ message: 'Usuário não cadastrado!', error });

      const { user: login, error: errorLogin } = await connection.auth.signIn({ email, password });

      if (errorLogin) res.status(500).json({ message: 'Usuário não logado!', error: errorLogin });

      const { error: errorUpload, data: avatar } = await connection.storage.from('Semioflix').upload(`/avatars/avatar-${user?.id}.${file.mimetype.split('/')[1]}`, fs.readFileSync(file.path), {
        cacheControl: '3600',
        upsert: false,
        contentType: file.mimetype
      });

      fs.unlinkSync(file.path);

      if (!avatar || errorUpload) return res.status(500).json({ message: 'Avatar não enviado!', error: errorUpload });

      const userme = new User({
        userId: user?.id as string,
        email,
        name,
        username,
        avatar: "",
        accesses: []
      });

      userme.setAvatar(process.env.STORAGE + avatar?.Key as string);

      userme.setAccesses(new Accesses({
        date: new Date(),
        location: {
          country: req.ip,
          state: req.ip,
          city: req.ip,
          ip: req.socket.remoteAddress
        },
        browser: browser(req.headers['user-agent']).name,
        machine: os.hostname() + ' - ' + os.platform() + ' - ' + os.arch() + ' - ' + os.release()
      }))

      const { data: register, error: errorRegister } = await connection.from('Users').insert(userme);
      if (errorRegister) return res.status(500).json({ message: 'Usuário não cadastrado!', error: errorRegister });

      App.set('user', userme);

      return res.status(200).redirect('/admin');
    });

    this.router.get('/signout', async (req: Request, res: Response) => {
      req.session.destroy((err) => {
        if (err) return res.status(500).json({ error: err });
      });

      const user = new User(App.get('user'));
      let lastAccess = user.accesses[user.accesses.length - 1];
      user.setExitAccesses(new Accesses({ ...lastAccess }));

      const { error } = await connection.from('Users').update(user).match({ userId: user.userId });
      if (error) return res.status(500).json({ message: 'Usuário não atualizado', error });

      const exit = await connection.auth.signOut();
      if (exit) return res.status(200).redirect('/');
      else return res.status(500).json({ error: 'Error' });
    });

    this.router.put('/update', async (req: Request, res: Response) => {
      const { email, password } = req.body;
      const user = await connection.auth.update({ email, password });

      if (user) res.status(200).json({ message: 'Usuário atualizado com sucesso' });
      else res.status(500).json({ message: 'Usuário não atualizado!', error: 'Error' });
    });

    this.router.post('/forgot', async (req: Request, res: Response) => {
      const { email } = req.body;
      const user = await connection.auth.api.resetPasswordForEmail(email);

      if (user) res.status(200).json({ message: 'Usuário atualizado com sucesso' });
      else res.status(500).json({ message: 'Usuário não atualizado!', error: 'Error' });
    });

    this.router.delete('/delete', async (req: Request, res: Response) => {
      const { id } = req.body;
      const user = await connection.auth.api.deleteUser(id);

      if (user) res.status(200).json({ message: 'Usuário removido com sucesso' });
      else res.status(500).json({ message: 'Usuário não removido!', error: 'Error' });
    });
  }
}

export default new AuthenticateRoutes().router;