import SendBird from 'sendbird';

// const APP_ID = '9DA1B1F4-0BE6-4DA8-82C5-2E81DAB56F23';
const APP_ID = '56BAB8A7-C472-45ED-A5CA-03C3E443B964';

export const sbConnect = (userId, nickname) => {
  return new Promise((resolve, reject) => {
    const sb = new SendBird({ 'appId': APP_ID });
    sb.connect(userId, (user, error) => {
      if (error) {
        reject('SendBird Login Failed.');
      } else {
        resolve(sbUpdateProfile(nickname));
      }
    })
  })
};

export const sbDisconnect = () => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    if (sb) {
      sb.disconnect(() => {
        resolve(null);
      });
    } else {
      resolve(null);
    }
  })
}

export const sbUpdateProfile = (nickname) => {
  return new Promise((resolve, reject) => {
    if (!nickname) {
      reject('Nickname is required.');
      return;
    }
    const sb = SendBird.getInstance();
    sb.updateCurrentUserInfo(nickname, null, (user, error) => {
      if (error) {
        reject('Update profile failed.')
      } else {
        resolve(user);
      }
    })
  })
}

export const sbGetCurrentInfo = () => {
  const sb = SendBird.getInstance();
  return {
    profileUrl: sb.currentUser.profileUrl,
    nickname: sb.currentUser.nickname
  }
}