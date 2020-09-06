import {
  NextFunction,
  Response,
} from 'express';
import httpStatus from 'http-status';

import {
  getErrorResponse,
  getResponse,
} from '../config/response';
import {
  Message,
  MessageCodes,
} from '../shared/message-codes/message-codes';

export default class FileUploadController {
  public fileUpload = async (
    request: any,
    response: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
        const res = getResponse(
          httpStatus.OK,
          {
            DownloadURL: ('C:\\Users\\ABC\\Downloads\\MEAN-Product-master\\backend\\' + request.file.path),
            FileName: request.file.originalname,
          },
          MessageCodes.FileUpload_Success,
          Message.FileUpload_Success
        );
        return response.status(res.status).send(res);
    } catch (error) {
      const res = getErrorResponse(
        httpStatus.INTERNAL_SERVER_ERROR,
        MessageCodes.UnexpectedError,
        Message.UnexpectedError
      );
      return response.status(res.status).send(res);
    }
  };
}
