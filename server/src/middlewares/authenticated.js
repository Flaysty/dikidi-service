import jwt from 'jsonwebtoken'
import { SECRET, SECRET2 } from '../config'

export default (req, res, next) => {
    const token  = req.headers['x-token'];
    if (token) {
        jwt.verify(token, SECRET, (err) => {
            if (err) {
                res.status(401).json({
                    error: 'Failed to authenticate'
                });
            }
            else {
                next();
            }
        })
    }
    else {
        res.status(403).json({
            error: 'No token provided'
        });
    }
}