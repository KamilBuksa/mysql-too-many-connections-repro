import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PoolTestController } from "./pool-test.controller";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "pooltest",
      entities: [],
      synchronize: false,
      extra: {
        connectionLimit: 30,
      },
    }),
  ],
  controllers: [PoolTestController],
})
export class AppModule {}
