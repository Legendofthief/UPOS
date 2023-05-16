const {getImgs} =  require('./utls');

class FileController {
    async create(req, res,next) {
        try{
        const fileName=getImgs(req);
        return res.json({img:fileName})
    }
    catch (e) {
        next(ApiError.badRequest(e.message))
    }
 }
}

module.exports = new FileController()