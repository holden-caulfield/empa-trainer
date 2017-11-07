import About from './About'
import Intervals, { Info as IntervalsInfo } from './Intervals'
import Progressions from './Progressions'

export default [
  {
    name: 'intervals',
    route: '/intervals',
    component: Intervals,
    props: {
      title: 'Intervalos',
      infoSection: IntervalsInfo,
      infoIcon: 'area-chart'
    }
  },
  {
    name: 'progressions',
    route: '/progressions',
    component: Progressions,
    props: {
      title: 'Dictado Armónico'
    }
  },
  {
    name: 'about',
    route: '/about',
    component: About,
    props: {
      title: 'Acerca de EMPATrainer'
    }
  }
]
