import { SCENES } from '../constants';
import { InteriorScene, ContentPanel } from './InteriorScene';

export class ArcadeScene extends InteriorScene {
  roomWidth = 17;
  roomHeight = 15;
  roomLabel = 'PROJECTS';

  constructor() {
    super(SCENES.ARCADE);
  }

  getContent(): ContentPanel[] {
    return [
      {
        x: 2, y: 2, width: 210,
        title: 'THIS PORTFOLIO',
        lines: [
          'An interactive portfolio built',
          'with Phaser 3 + TypeScript.',
          'Drive a formula car around a',
          'city and visit buildings to',
          'explore my work and skills.',
          '',
          'Tech: Phaser 3, TypeScript, Vite',
        ],
      },
      {
        x: 9, y: 2, width: 210,
        title: '[PROJECT NAME]',
        lines: [
          '[What does it do?]',
          '',
          '[What problem does it solve?]',
          '',
          'Tech: [stack]',
          'Link: [url]',
        ],
      },
      {
        x: 2, y: 8, width: 210,
        title: '[PROJECT NAME]',
        lines: [
          '[What does it do?]',
          '',
          '[What problem does it solve?]',
          '',
          'Tech: [stack]',
          'Link: [url]',
        ],
      },
      {
        x: 9, y: 8, width: 210,
        title: '[PROJECT NAME]',
        lines: [
          '[What does it do?]',
          '',
          '[What problem does it solve?]',
          '',
          'Tech: [stack]',
          'Link: [url]',
        ],
      },
    ];
  }
}
