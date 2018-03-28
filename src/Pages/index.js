import About from './About'
import Intervals, { Info as IntervalsInfo } from './Intervals'
import Scales from './Scales'

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
    name: 'scales',
    route: '/scales',
    component: Scales,
    props: {
      title: 'Escalas'
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
