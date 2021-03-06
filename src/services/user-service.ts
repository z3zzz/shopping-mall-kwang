import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import {
  userModel,
  UserModel,
  UserInfo,
  UserAddress,
  UserData,
  Role,
} from "../db";
import { userMysqlModel } from "../db-mysql";

interface LoginInfo {
  email: string;
  password: string;
}

interface LoginResult {
  token: string;
  isAdmin: boolean;
}

interface DeliveryInfo {
  address: UserAddress;
  phoneNumber: string;
}

interface UserInfoRequired {
  userId: string;
  currentPassword: string;
}

class UserService {
  constructor(private userModel: UserModel) {}

  // 일반 회원가입
  async addUser(userInfo: UserInfo): Promise<UserData> {
    // 객체 destructuring
    const { email, fullName, password } = userInfo;

    // 이메일 중복 확인
    const user = await this.userModel.findByEmail(email);
    if (user) {
      throw new Error(
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요."
      );
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserInfo = { fullName, email, password: hashedPassword };

    // db에 저장
    const createdNewUser = await this.userModel.create(newUserInfo);

    return createdNewUser;
  }

  // Google Oauth 회원가입
  async addUserWithGoogle(googleToken: string): Promise<UserData> {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const client = new OAuth2Client(clientId);

    // 공식 문서 코드 그대로 사용
    // https://developers.google.com/identity/gsi/web/guides/verify-google-id-token?hl=en
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: clientId,
    });

    // 구글 계정 정보가 담긴 객체 (email, name 등)
    // https://developers.google.com/identity/gsi/web/reference/js-reference?hl=en#credential
    const payload = ticket.getPayload();

    if (!payload) {
      throw new Error(
        "구글 OAuth 도중 오류가 발생하였습니다. 구글 계정을 확인할 수 없습니다."
      );
    }

    // 필요한 정보 추출
    const { email, name } = payload;

    if (!email || !name) {
      throw new Error("회원가입을 위해서는 이메일과 이름이 필요합니다");
    }

    // 이메일 중복 확인
    const user = await this.userModel.findByEmail(email);
    if (user) {
      throw new Error(
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요."
      );
    }

    // 비밀번호는 임시로 설정
    const password = "google";
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserInfo = {
      fullName: name,
      email,
      password: hashedPassword,
      isOAuth: true,
    };

    // db에 저장
    const createdNewUser = await this.userModel.create(newUserInfo);

    return createdNewUser;
  }

  // 카카오 Oauth 회원가입
  async addUserWithKakao(email: string, nickname: string): Promise<UserData> {
    if (!email || !nickname) {
      throw new Error("회원가입을 위해서는 이메일과 이름이 필요합니다");
    }

    // 이메일 중복 확인
    const user = await this.userModel.findByEmail(email);
    if (user) {
      throw new Error(
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요."
      );
    }

    // 비밀번호는 임시로 설정
    const password = "kakao";
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserInfo = {
      fullName: nickname,
      email,
      password: hashedPassword,
      isOAuth: true,
    };

    // db에 저장
    const createdNewUser = await this.userModel.create(newUserInfo);

    return createdNewUser;
  }

  // 일반 로그인
  async getUserToken(loginInfo: LoginInfo): Promise<LoginResult> {
    // 객체 destructuring
    const { email, password } = loginInfo;

    // 이메일 db에 존재 여부 확인
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new Error(
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey);

    const isAdmin = user.role === "admin";

    return { token, isAdmin };
  }

  // 비밀번호 맞는지 여부만 확인
  async checkUserPassword(userId: string, password: string): Promise<UserData> {
    // 이메일 db에 존재 여부 확인
    const user = await this.userModel.findById(userId);

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new Error(
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }

    // 비밀번호 일치함. 유저 정보 반환
    return user;
  }

  // 구글 OAuth 로그인 (구글 토큰을 받고, 몽구스 id와 role이 담긴 토큰을 반환함)
  async getUserTokenWithGoogle(googleToken: string): Promise<LoginResult> {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const client = new OAuth2Client(clientId);

    // 위 구글 OAuth 회원가입 코드의 주석 참고
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new Error(
        "구글 OAuth 도중 오류가 발생하였습니다. 구글 계정을 확인할 수 없습니다."
      );
    }

    const { email } = payload;

    if (!email) {
      throw new Error("로그인을 위해서는 이메일이 필요합니다");
    }

    // 이메일 db에 존재 여부 확인
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey);

    const isAdmin = user.role === "admin";

    return { token, isAdmin };
  }

  // 카카오 Oauth 로그인
  async getUserTokenWithKakao(email: string): Promise<LoginResult> {
    if (!email) {
      throw new Error("로그인을 위해서는 이메일 필요합니다");
    }

    // 이메일 db에 존재 여부 확인
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey);

    const isAdmin = user.role === "admin";

    return { token, isAdmin };
  }

  async getUsers(): Promise<UserData[]> {
    const users = await this.userModel.findAll();
    return users;
  }

  // 유저정보 수정, 현재 비밀번호가 있어야 수정 가능함.
  async setUser(
    userInfoRequired: UserInfoRequired,
    toUpdate: Partial<UserInfo>
  ): Promise<UserData> {
    // 객체 destructuring
    const { userId, currentPassword } = userInfoRequired;

    // 우선 해당 id의 유저가 db에 있는지 확인
    let user = await this.userModel.findById(userId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      throw new Error("가입 내역이 없습니다. 다시 한 번 확인해 주세요.");
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new Error(
        "현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }

    // 이제 업데이트 시작

    // 비밀번호도 변경하는 경우에는 해쉬화 해주어야 함.
    const { password } = toUpdate;

    if (password) {
      const newPasswordHash = await bcrypt.hash(password!, 10);
      toUpdate.password = newPasswordHash;
    }

    // 업데이트 진행
    user = await this.userModel.update({
      userId,
      update: toUpdate,
    });

    return user;
  }

  // 위 setUser과 달리, 현재 비밀번호 없이도, 권한을 수정할 수 있음.
  async setRole(userId: string, role: Role) {
    const updatedUser = await this.userModel.update({
      userId,
      update: { role },
    });

    return updatedUser;
  }

  // 위 setUser과 달리, 현재 비밀번호 없이도, 주소 혹은 번호를 수정할 수 있음.
  async saveDeliveryInfo(userId: string, deliveryInfo: Partial<DeliveryInfo>) {
    const updatedUser = await this.userModel.update({
      userId,
      update: deliveryInfo,
    });

    return updatedUser;
  }

  async getUserData(userId: string): Promise<UserData> {
    const user = await this.userModel.findById(userId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      throw new Error("가입 내역이 없습니다. 다시 한 번 확인해 주세요.");
    }

    return user;
  }

  async deleteUserData(userId: string): Promise<{ result: string }> {
    const { deletedCount } = await this.userModel.deleteById(userId);

    // 삭제에 실패한 경우, 에러 메시지 반환
    if (deletedCount === 0) {
      throw new Error(`${userId} 사용자 데이터의 삭제에 실패하였습니다.`);
    }

    return { result: "success" };
  }
}

const usedDb = process.env.USED_DB;

let userService: UserService;
if (usedDb === "mongodb") {
  userService = new UserService(userModel);
} else {
  //@ts-ignore
  userService = new UserService(userMysqlModel);
}

export { userService };
