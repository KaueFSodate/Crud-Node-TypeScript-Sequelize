import jwt from 'jsonwebtoken'
import { Response, Request } from "express"
import { usuarios } from "../models/usuarios"
const secret:string = 'AX88GH9H38KG0B0304LG'


const criarToken = async(req: Request, res: Response, usuarios: usuarios) => {

    try {
        
        // Criar token
        const token = jwt.sign({
            id: usuarios.id
        }, 
        secret
        )


        // Retornar token
        res.json({
            auth: true,
            token: token,
            usuarioid: usuarios.id
        })

    }catch (error) {
        console.log(error)
    }
}

export default criarToken