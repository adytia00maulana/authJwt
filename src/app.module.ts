import { Logger, Module } from "@nestjs/common";
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CurrencyModule } from './modules/integration/currency/currency.module';

@Module({
  imports: [PrismaModule, ArticlesModule, UsersModule, AuthModule, CurrencyModule],
  providers: [Logger],
})
export class AppModule {}
