import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import { getErrorResponse, getResponse } from "../../src/config/response";
import CategoryModel from "../../src/model/Category.Model";
import { User } from "../model/User";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { Message, MessageCodes } from "../shared/message-codes/message-codes";
import { ICategory } from "../interface/Category.interface";

export default class CategoryController {
  public getCategory = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const user: User = request["user"];
      const item = { userId: user.userId };
      const categoryRepository = new CategoryRepository(CategoryModel);
      const res = getResponse(
        httpStatus.OK,
        await categoryRepository.getCategory(JSON.stringify(item))
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

  public getCategoryById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const categoryRepository = new CategoryRepository(CategoryModel);
      const res = getResponse(
        httpStatus.OK,
        await categoryRepository.getCategoryById(request.params.id)
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

  public addCategory = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const user: User = request["user"];
      const category: ICategory = request.body;

      category.userId = user.userId;
      const categoryRepository = new CategoryRepository(CategoryModel);

      const res = getResponse(
        httpStatus.OK,
        await categoryRepository.create(category),
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

  public deleteCategory = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const categoryRepository = new CategoryRepository(CategoryModel);
      const res = getResponse(
        httpStatus.OK,
        await categoryRepository.findByIdAndDelete(request.params.id),
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

  public updateCategory = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const category: ICategory = request.body;
      const categoryRepository = new CategoryRepository(CategoryModel);
      const res = getResponse(
        httpStatus.OK,
        await categoryRepository.findByIdAndUpdate(
          category.id,
          category,
          JSON.stringify({ returnOriginal: false })
        ),
        MessageCodes.Update,
        Message.Update
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
