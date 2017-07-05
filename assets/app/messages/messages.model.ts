export class Message {

    constructor(public content: string,
                public userName: string,
                public messageId?: string,
                public userId?: string
    ) {
        this.content = content;
        this.userName = userName;
        this.messageId = messageId;
        this.userId = userId;
    }
}