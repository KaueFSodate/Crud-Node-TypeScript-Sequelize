import jwt  from 'jsonwebtoken'
import { Response, Request } from "express"
import { usuarios } from "../models/usuarios"
const secret: string = 'AX88GH9H38KG0B0304LG'

// Pegar usuário por token

const pegarUsuarioToken = async(res: Response,token:string) => {
    
    if(!token){
        res.json({message: "Acesso negado"})
    }


    const decoded:any  = jwt.verify(token, secret)
    const usuarioid = decoded.id


    const usuario = await usuarios.findByPk(usuarioid)

    return usuario

}

export default  pegarUsuarioToken