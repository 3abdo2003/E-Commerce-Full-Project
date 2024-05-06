/* eslint-disable prettier/prettier */
export class LoginUserDto {
  readonly email: string;
  readonly password: string;

  toString(): string {
    return JSON.stringify({
      email: this.email,
      password: this.password,
    });
  }
}

  export class ResetPasswordRequestDto {
    readonly email: string;

    toString(): string {
      return JSON.stringify({
        email: this.email,
      });
    }
  }


