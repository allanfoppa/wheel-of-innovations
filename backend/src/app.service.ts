import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

@Injectable()
export class AppService {
  metadata(): object {
    try {
      return {
        "metadata": {
          "message": "Success retrieving metadata.",
        },
        "content": {
          "title": "Wheel of Innovations",
          "summary": "Involves randomly selecting new technologies to learn as quarterly or semi-annual challenges, ensuring I remain proficient in various languages and frameworks.",
          "version": `${process.env.APP_VERSION}`,
          "author": {
            "name": "Allan Foppa Fagundes",
            "email": "allanfoppa.dev@gmail.com",
            "github_profile": "https://github.com/allanfoppa",
          },
        }
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
