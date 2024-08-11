import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ResponseHelper } from './common/helpers/response.helper';

@Injectable()
export class AppService {

  constructor(
    private readonly responseHelper: ResponseHelper,
  ){}

  metadata(): object {
    try {

      const appMetadata = {
        "title": "Wheel of Innovations",
        "summary": "Involves randomly selecting new technologies to learn as quarterly or semi-annual challenges, ensuring I remain proficient in various languages and frameworks.",
        "version": `${process.env.APP_VERSION}`,
        "author": {
          "name": "Allan Foppa Fagundes",
          "email": "allanfoppa.dev@gmail.com",
          "githubProfile": "https://github.com/allanfoppa",
        },
      }

      return this.responseHelper.createResponse(
        "Success retrieving metadata.",
        appMetadata
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
