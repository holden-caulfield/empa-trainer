import About from './About'
import Intervals, { Info as IntervalsInfo } from './Intervals'

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
    name: 'about',
    route: '/about',
    component: About,
    props: {
      title: 'Acerca de EMPATrainer'
    }
  }
]
