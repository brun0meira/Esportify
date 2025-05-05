export class CreateChatRoomDto {
    name: string;
    description?: string;
    isPublic?: boolean;
    createdById: string;
  }
  
  export class UpdateChatRoomDto {
    name?: string;
    description?: string;
    isPublic?: boolean;
  }
  
  export class SendMessageDto {
    content: string;
    roomId: string;
    userId: string;
  }
  
  export class JoinRoomDto {
    roomId: string;
    userId: string;
  }
  
  export class ChatRoomResponse {
    id: string;
    name: string;
    description?: string;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
    messages?: ChatMessageResponse[];
    members?: UserResponse[];
    createdBy?: UserResponse;
  }
  
  export class ChatMessageResponse {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    user: UserResponse;
  }
  
  export class UserResponse {
    id: string;
    name: string;
    email: string;
  }