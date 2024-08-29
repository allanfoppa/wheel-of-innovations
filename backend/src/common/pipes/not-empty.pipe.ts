import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class NotEmptyPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!value || value.trim() === '') {
      throw new BadRequestException('Parameter cannot be empty');
    }
    return value;
  }
}
