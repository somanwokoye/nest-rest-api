import { Module } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchModule } from 'src/search/search.module';
import UsersSearchService from 'src/search/services/usersSearch.services';
import { Role } from '../roles/models/role.entity';
import { TenantAccountOfficer } from '../tenants/models/tenant-account-officer';
import { TenantTeam } from '../tenants/models/tenant-team';
import { Tenant } from '../tenants/models/tenant.entity';
import { User } from './models/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Tenant, TenantTeam, TenantAccountOfficer]), SearchModule],
  controllers: [UsersController],
  providers: [UsersService, UsersSearchService]
})
export class UsersModule {}
