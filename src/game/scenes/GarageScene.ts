import { SCENES } from '../constants';
import { InteriorScene, ContentPanel } from './InteriorScene';

export class GarageScene extends InteriorScene {
  roomWidth = 16;
  roomHeight = 14;
  roomLabel = 'ABOUT ME';

  constructor() {
    super(SCENES.GARAGE);
  }

  getContent(): ContentPanel[] {
    return [
      {
        x: 2, y: 2, width: 200,
        title: 'RUSSELL J ADAMS',
        lines: [
          'Software Engineer & Sim Racer',
          '',
          '[Write a short bio about yourself',
          'here. What drives you, what you',
          'are passionate about, etc.]',
        ],
      },
      {
        x: 9, y: 2, width: 200,
        title: 'SKILLS',
        lines: [
          'Languages:',
          '  TypeScript, JavaScript, Python',
          '  [Add more...]',
          '',
          'Frameworks:',
          '  React, Next.js, Node.js',
          '  [Add more...]',
          '',
          'Tools:',
          '  Git, Docker, AWS',
          '  [Add more...]',
        ],
      },
      {
        x: 2, y: 8, width: 200,
        title: 'EDUCATION',
        lines: [
          '[Your University]',
          '[Degree] - [Year]',
          '',
          '[Any other education,',
          'certifications, etc.]',
        ],
      },
      {
        x: 9, y: 8, width: 200,
        title: 'INTERESTS',
        lines: [
          'Sim Racing',
          'Formula 1',
          '[Add your interests...]',
        ],
      },
    ];
  }
}
