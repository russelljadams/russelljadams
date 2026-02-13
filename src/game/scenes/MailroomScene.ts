import { SCENES } from '../constants';
import { InteriorScene, ContentPanel } from './InteriorScene';

export class MailroomScene extends InteriorScene {
  roomWidth = 12;
  roomHeight = 10;
  roomLabel = 'CONTACT';

  constructor() {
    super(SCENES.MAILROOM);
  }

  getContent(): ContentPanel[] {
    return [
      {
        x: 2, y: 2, width: 260,
        title: 'GET IN TOUCH',
        lines: [
          'Email:',
          '  [your@email.com]',
          '',
          'GitHub:',
          '  github.com/russelljadams',
          '',
          'LinkedIn:',
          '  linkedin.com/in/russelljadams',
        ],
      },
      {
        x: 2, y: 6, width: 260,
        title: 'AVAILABILITY',
        lines: [
          '[Open to opportunities,',
          'freelance, collaboration,',
          'etc. Customize this!]',
        ],
      },
    ];
  }
}
