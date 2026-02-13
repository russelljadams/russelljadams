import { SCENES } from '../constants';
import { InteriorScene, ContentPanel } from './InteriorScene';

export class OfficeScene extends InteriorScene {
  roomWidth = 16;
  roomHeight = 15;
  roomLabel = 'EXPERIENCE';

  constructor() {
    super(SCENES.OFFICE);
  }

  getContent(): ContentPanel[] {
    return [
      {
        x: 2, y: 2, width: 200,
        title: '[COMPANY NAME]',
        lines: [
          '[Job Title]',
          '[Start Date] - [End Date]',
          '',
          '[Describe what you did,',
          'key achievements, impact,',
          'technologies used, etc.]',
        ],
      },
      {
        x: 9, y: 2, width: 200,
        title: '[COMPANY NAME]',
        lines: [
          '[Job Title]',
          '[Start Date] - [End Date]',
          '',
          '[Describe what you did,',
          'key achievements, impact,',
          'technologies used, etc.]',
        ],
      },
      {
        x: 2, y: 8, width: 200,
        title: '[COMPANY NAME]',
        lines: [
          '[Job Title]',
          '[Start Date] - [End Date]',
          '',
          '[Describe what you did,',
          'key achievements, impact,',
          'technologies used, etc.]',
        ],
      },
      {
        x: 9, y: 8, width: 200,
        title: '[EARLIER ROLES]',
        lines: [
          '[Add as many roles',
          'as you like. Drive',
          'around to read them!]',
        ],
      },
    ];
  }
}
