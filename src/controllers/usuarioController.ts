import { RequestHandler } from "express"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { usuarios } from "../models/usuarios"
const secret:string = 'AX88GH9H38KG0B0304LG'

// Helpers
import criarToken from '../helpers/criarToken'
import pegarToken from '../helpers/pegarToken'
import pegarUsuarioToken from '../helpers/pegarUsuarioToken'

export default class usersController{

    static criarUsuario: RequestHandler = async (req, res, next) => {

      const {nome, senha} = req.body

        // Validações 

        if(!nome){
            res.json({message:"Insira um nome"})
            return
        }

        if(!senha){
            res.json({message:"Insira uma senha"})
            return
        }

        // Criar senha criptografada
        const salt = await bcrypt.genSalt(12)
        const senhaHash = await bcrypt.hash(senha, salt)

        const usuario = new usuarios({
            nome: nome,
            senha: senhaHash
        })

      const UsuarioT:usuarios = await  usuario.save();

      await criarToken(req, res, UsuarioT)
    };

    static login:RequestHandler = async(req, res) => {
      const {nome, senha} = req.body

      if(!nome){
          res.json({message:"Insira um nome"})
          return
      }

      if(!senha){
          res.json({message:"Insira uma senha"})
          return
      }

      // Checar usuario
      const Usuario = await usuarios.findOne({
        where:{
            nome: nome
        }
    })

      if(!Usuario){
          res.json({message:"Usuario não existe"})
          return
      }

      // Checar senha

      const existeSenha:boolean = await bcrypt.compare(senha, Usuario.senha)

      if(!existeSenha){
          res.json({message:"Senha invalida!"})
          return
      }

      await criarToken(req, res, Usuario)

    }

    static checarUsuario: RequestHandler = async(req, res, next) => {
      let currentUser

      if(req.headers.authorization){

          const token = pegarToken(req)
          console.log(token)  // Mostra o toke sem o 'bearer'
          const decoded:any = jwt.verify(token, secret)

          currentUser = await usuarios.findByPk(decoded.id)


      }else{
          currentUser = null
      }

      res.json({message: currentUser})
  }

    static deletarUsuario: RequestHandler = async (req, res, next) => {
      const { id } = req.params;
      await usuarios.destroy({ where: { id } });
      return res
        .status(200)
        .json({ message: "Usuario deletado com sucesso" });
    };

    static checarUsuarioPorId: RequestHandler = async (req, res, next) => {
      const { id } = req.params;
      const usuario:  usuarios | null = await  usuarios.findByPk(id);
      return res
        .status(200)
        .json({ message: "Usuario listado por id com sucesso", data: usuario });
    };

    static alterarUsuario: RequestHandler = async (req, res, next) => {
      const { id } = req.params;

      

      // Checa se o usuário existe e pegar o usuario
      const token = pegarToken(req)
      const usuario = await pegarUsuarioToken(res,token)

      const {nome, senha} = req.body


        usuario!.id = id
        // Validações 

        if(!nome){
            res.json({message:"Insira um nome"})
            return
        }

        usuario!.nome = nome
        console.log(usuario!.nome)

        if(!senha){
            res.json({message:"Insira uma senha"})
            return
        }


        // Criar senha criptografada
        const salt = await bcrypt.genSalt(12)
        const senhaHash = await bcrypt.hash(senha, salt)

        usuario!.senha = senhaHash

        console.log(usuario!.dataValues)

        try {
            
          await usuarios.update(usuario!.dataValues,{
            where:{
                id: req.params.id
            }
        });
        const updatedUsuarios: usuarios | null = await usuarios.findByPk(id);
        res.status(200).json({msg:  "Usuario alterado com sucesso", data: updatedUsuarios });
        } catch (error) {
            console.log(error);
        }
    }

}