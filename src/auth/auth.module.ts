import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/models/user.entity';
import { Role } from 'src/roles/models/role.entity';
import { Tenant } from 'src/tenants/models/tenant.entity';
import { TenantTeam } from 'src/tenants/models/tenant-team';
import { TenantAccountOfficer } from 'src/tenants/models/tenant-account-officer';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [UsersModule, PassportModule, TypeOrmModule.forFeature([User, Role, Tenant, TenantTeam, TenantAccountOfficer])],
  providers: [AuthService, LocalStrategy, UsersService],
  controllers: [AuthController]
})
export class AuthModule {}
