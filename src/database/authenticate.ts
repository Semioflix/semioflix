import { NextFunction, Request, Response } from 'express';
import dns from 'dns';

import { connection } from './connection';
import App from '../App';
import { User } from './models/User';

function authenticate() {
  return {
    auth: (req: Request, res: Response, next: NextFunction) => {
      authenticate().connecting(req, res, () => {
        const authenticated = connection.auth.session() ? true : false;

        if (authenticated) return next();
        return res.status(401).redirect('/admin');
      });
    },
    onlyAdmins: (req: Request, res: Response, next: NextFunction) => {
      authenticate().auth(req, res, async () => {
        const { data, error } = await connection
          .from("Users")
          .select("*")
          .match({ id: App.get("user").getId() });

        if (error) return res.status(401).redirect('/admin');

        const user = new User(data[0]);

        if (user.getAdmin()) return next();
        return res
          .status(401)
          .json({
            message:
              "Ops! Você não pode acessar está funcionalidade, pois você não é um adiminstrador!",
          });
      });
    },
    connecting: (req: Request, res: Response, next: NextFunction) => {
      dns.lookup('google.com', (err) => {
        if (err && err.code === 'ENOTFOUND') return res.status(501).json({ message: 'Ops! Você deve conectar-se com à internet para continuar!' });
        return next();
      });
    },
    uploadController: (req: Request, res: Response, next: NextFunction) => {
      const { file }: any = req;

      if (!file) return res.status(400).json({ message: 'Ops! Você deve selecionar um arquivo para continuar!' });
      return next();
    }
  }
}

export { authenticate };