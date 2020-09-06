import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import { getErrorResponse, getResponse } from "../../src/config/response";
import ContentModel from "../../src/model/Content.Model";
import { IContent } from "../interface/Content.interface";
import { User } from "../model/User";
import { ContentRepository } from "../repositories/ContentRepository";
import { Message, MessageCodes } from "../shared/message-codes/message-codes";

export default class ContentController {
  public getContent = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const user: User = request["user"];
      const item = { userId: user.userId, categoryId: request.params.id };
      const contentRepository = new ContentRepository(ContentModel);
      const res = getResponse(
        httpStatus.OK,
        await contentRepository.getContent(JSON.stringify(item))
      );
      return response.status(res.status).send(res);
    } catch (error) {
      const res = getErrorResponse(
        httpStatus.INTERNAL_SERVER_ERROR,
        MessageCodes.UnexpectedError,
        Message.UnexpectedError,
        error
      );
      return response.status(res.status).send(res);
    }
  };

  public getContentById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const contentRepository = new ContentRepository(ContentModel);
      const res = getResponse(
        httpStatus.OK,
        await contentRepository.getContentById(request.params.id)
      );
      return response.status(res.status).send(res);
    } catch (error) {
      const res = getErrorResponse(
        httpStatus.INTERNAL_SERVER_ERROR,
        MessageCodes.UnexpectedError,
        Message.UnexpectedError,
        error
      );
      return response.status(res.status).send(res);
    }
  };

  public addContent = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const user: User = request["user"];
      const content: IContent = request.body;

      content.userId = user.userId;
      const contentRepository = new ContentRepository(ContentModel);

      const res = getResponse(
        httpStatus.OK,
        await contentRepository.create(content),
        MessageCodes.Create,
        Message.Create
      );
      return response.status(res.status).send(res);
    } catch (error) {
      const res = getErrorResponse(
        httpStatus.INTERNAL_SERVER_ERROR,
        MessageCodes.UnexpectedError,
        Message.UnexpectedError,
        error
      );
      return response.status(res.status).send(res);
    }
  };

  public deleteContent = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const contentRepository = new ContentRepository(ContentModel);
      const res = getResponse(
        httpStatus.OK,
        await contentRepository.findByIdAndDelete(request.params.id),
        MessageCodes.Delete,
        Message.Delete
      );
      return response.status(res.status).send(res);
    } catch (error) {
      const res = getErrorResponse(
        httpStatus.INTERNAL_SERVER_ERROR,
        MessageCodes.UnexpectedError,
        Message.UnexpectedError,
        error
      );
      return response.status(res.status).send(res);
    }
  };
}
