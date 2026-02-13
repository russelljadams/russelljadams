import { SCENES } from '../constants';
import { InteriorScene, ContentPanel } from './InteriorScene';

export class DepotScene extends InteriorScene {
  roomWidth = 16;
  roomHeight = 14;
  roomLabel = 'AMAZON DELIVERY';

  constructor() {
    super(SCENES.DEPOT);
  }

  getContent(): ContentPanel[] {
    return [
      {
        x: 2, y: 2, width: 200,
        title: 'DELIVERY DRIVER',
        lines: [
          'Amazon DSP Driver',
          '',
          'Delivering 250+ packages daily',
          'across residential and commercial',
          'routes. Rain or shine.',
          '',
          'Skills developed:',
          '  Route optimization',
          '  Time management',
          '  Customer service',
        ],
      },
      {
        x: 9, y: 2, width: 200,
        title: 'THE DAILY GRIND',
        lines: [
          'Load out at the depot,',
          'organize by route stop,',
          'deliver with precision.',
          '',
          'Average day:',
          '  10 hour shifts',
          '  180+ stops',
          '  250+ packages',
          '',
          'Every package delivered is',
          'a promise kept.',
        ],
      },
      {
        x: 2, y: 8, width: 200,
        title: 'WHY IT MATTERS',
        lines: [
          'This job taught me hustle,',
          'reliability, and grit.',
          '',
          'Working while building',
          'software skills on the side.',
          'The grind never stops.',
        ],
      },
      {
        x: 9, y: 8, width: 200,
        title: 'SWAP VEHICLE',
        lines: [
          'Visit the DEPOT door in',
          'the overworld to swap',
          'between the F1 car and',
          'the delivery van.',
          '',
          'The van is slower but',
          'handles tighter turns.',
        ],
      },
    ];
  }
}
