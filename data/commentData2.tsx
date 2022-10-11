import amyrobinsonAvatar from '../public/avatars/image-amyrobson.png';
import maxblagunAvatar from '../public/avatars/image-maxblagun.png';
import ramsesmironAvatar from '../public/avatars/image-ramsesmiron.png';
import juliusomoAvatar from '../public/avatars/image-juliusomo.png';
import { StaticImageData } from 'next/image';

interface CurrentUserObject {
  userId: string;
  image: StaticImageData;
  username: string;
}

interface SingleCommentType {
  id: string;
  content: string;
  createdAt: string;
  replyTo: string | null;
  score: number;
  vote: {
    submitted: boolean;
    state: 'upvoted' | 'downvoted' | null;
  };
  user: {
    image: StaticImageData;
    username: string;
    userId: string;
  };
  replies: string[];
}

interface CommentList {
  [id: string]: SingleCommentType;
}

export const commentDataFlat: CommentList = {
  c00001: {
    id: 'c00001',
    content:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    createdAt: 'August 12, 2022 13:15:30',
    replyTo: null,
    score: 12,
    vote: {
      submitted: false,
      state: null
    },
    user: {
      image: amyrobinsonAvatar,
      username: 'amyrobson',
      userId: 'amy1'
    },
    replies: []
  },
  c00002: {
    id: 'c00002',
    content:
      "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    createdAt: 'August 2, 2022 13:15:30',
    replyTo: null,
    score: 5,
    vote: {
      submitted: false,
      state: null
    },
    user: {
      image: maxblagunAvatar,
      username: 'maxblagun',
      userId: 'max1'
    },
    replies: ['c00003', 'c00004']
  },
  c00003: {
    id: 'c00003',
    content:
      "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
    createdAt: 'July 21, 2022 15:15:30',
    replyTo: 'c00002',
    score: 4,
    vote: {
      submitted: false,
      state: null
    },
    user: {
      image: ramsesmironAvatar,
      username: 'ramsesmiron',
      userId: 'ram1'
    },
    replies: []
  },
  c00004: {
    id: 'c00004',
    content:
      "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
    createdAt: 'July 21, 2022 15:20:00',
    score: 2,
    replyTo: 'c00002',
    vote: {
      submitted: false,
      state: null
    },
    user: {
      image: juliusomoAvatar,
      username: 'juliusomo',
      userId: 'julius1'
    },
    replies: []
  }
};

const currentUser: CurrentUserObject = {
  userId: 'julius1',
  image: juliusomoAvatar,
  username: 'juliusomo'
};

export { currentUser };

export type { SingleCommentType, CommentList, CurrentUserObject };
