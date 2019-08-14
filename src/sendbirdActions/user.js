import SendBird from 'sendbird';

const APP_ID = '9DA1B1F4-0BE6-4DA8-82C5-2E81DAB56F23';

export const sbConnect = (userId, nickname) => {
    return new Promise((resolve, reject) => {
        const sb = new SendBird({ 'appId': APP_ID });
        sb.connect(userId, (user, error) => {
            if (error) {
                reject('SendBird Login Failed.');
            } else {
                sb.updateCurrentUserInfo(nickname, null, (user, error) => {
                    if (error) {
                        reject('Update User Failed.');
                    } else {
                        resolve(user);
                    }
                })
            }
        })
    })
};
