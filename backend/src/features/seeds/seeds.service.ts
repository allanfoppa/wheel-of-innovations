import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BackLang } from 'src/database/entities/back-lang.entity';
import { BackFramework } from 'src/database/entities/back-framework.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedsService {
  constructor(
    @InjectRepository(BackLang)
    private backLangRepository: Repository<BackLang>,
    @InjectRepository(BackFramework)
    private backFrameworkRepository: Repository<BackFramework>,
  ) {}

  async seedBack() {

    const technologies = [
      { name: 'Java', frameworks: ['Spring Boot', 'Java EE', 'Jakarta EE'] },
      { name: 'C++', frameworks: ['Qt', 'Boost', 'MFC'] },
      { name: 'C#', frameworks: ['.NET Core', 'ASP.NET Core', 'Xamarin'] },
      { name: 'JavaScript', frameworks: ['Express', 'Koa', 'Nestjs', 'Nextjs'] },
      { name: 'Python', frameworks: ['Django', 'Flask', 'Pyramid'] },
      { name: 'PHP', frameworks: ['Laravel', 'Symfony', 'CodeIgniter'] },
      { name: 'R', frameworks: ['Shiny', 'R Markdown'] },
      { name: 'Go', frameworks: ['Gin', 'Beego', 'Echo'] },
      { name: 'Swift', frameworks: ['SwiftUI', 'UIKit'] },
      { name: 'Ruby', frameworks: ['Ruby on Rails', 'Sinatra'] },
      { name: 'Rust', frameworks: ['Rocket', 'Actix'] },
      { name: 'Kotlin', frameworks: ['Spring Boot', 'Ktor'] },
      { name: 'Julia', frameworks: ['Genie', 'DataFrames.jl'] },
      { name: 'Elixir', frameworks: ['Phoenix'] }
    ];

    // 1º RUN AT TECHNOLOGIES LIST
    for (const technology of technologies) {
      // 2º CREATE A BACKLANG
      const backLang = this.backLangRepository.create({ name: technology.name });
      let backId = await this.backLangRepository.save(backLang);

      // 3º RUN AT FRAMEWORKS LIST
      for (const framework of technology.frameworks) {
        // 4º CREATE A BACKFRAMEWORK
        const backFramework = this.backFrameworkRepository.create({
          name: framework,
          backLang: backId
        });
        await this.backFrameworkRepository.save(backFramework);
      }
    }

  }

}
