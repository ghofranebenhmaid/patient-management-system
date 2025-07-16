import { Expose } from 'class-transformer';
import { UserRole } from '../../users/enums/user-role.enum';

export class AuthResponseDto {
  @Expose()
  access_token: string;

  @Expose()
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
  };
}
