import * as React from 'react'
import { getActivities } from '../shared/RestApi'
import { ActivityPlan, Day, DayItem, DayContent } from '../shared/Types'
import { RingLoaderWrapper } from '../shared/RingLoaderWrapper'
import styled from 'styled-components'
import { Modal, getTheme, mergeStyleSets, FontSizes, FontWeights, IconButton } from 'office-ui-fabric-react'

const Navbar = styled.div`
  display: flex;
  align-items: center;
  background-color: #0E76BC;
  padding-left: 12%;
  height: 60px;
`

const NavItem = styled.div`
  padding-right: 5%;
  font-size: 17px;
  color: white;
  text-align: center;
  transition: 0.5s;

  &:hover {
    cursor: pointer;
    transform: scale(1.08); 
  }
`
const DayHeading = styled.h1`
  margin-top: 20px;
  font-size: 20px;
  color: #0E76BC;
  display: flex;
  justify-content: center;
`

const BigContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 30vh;
  width: 60%;
`

const ActivityImageContainer = styled.div`
  margin-left: 10px;
  border-radius: 5px;
`

const ActivityImageInfo = styled.div`
  height: 40px;
`

const ActivityImage = styled.img`
  width: 240px;
  height: 170px;
  border-radius: 5px;
  transition: 0.5s;

  &:hover {
    cursor: pointer;
    transform: scale(1.08); 
  }
`

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch'
  },
  header: [
    theme.fonts.large,
    {
      flex: '1 1 auto',
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: 'flex',
      fontSize: FontSizes.xLarge,
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 24px'
    }
  ],
  body: {
    flex: '4 4 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: {
        margin: '14px 0'
      },
      'p:first-child': {
        marginTop: 0
      },
      'p:last-child': {
        marginBottom: 0
      }
    }
  }
});

const iconButtonStyles = mergeStyleSets({
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px'
  },
  rootHovered: {
    color: theme.palette.neutralDark
  }
});

type State = {
  activityPlan: ActivityPlan | undefined,
  currentDay: Day | undefined,
  showModal: boolean,
  currentActivity: DayContent | undefined,
}

interface MatchParams {
  id: string
}

interface Props extends RouteComponentProps<MatchParams> {
}

export interface RouteComponentProps<P> {
  match: match<P>
  staticContext?: any
}

export interface match<P> {
  params: P
  isExact: boolean
  path: string
  url: string
}

export class Home extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      activityPlan: undefined,
      currentDay: undefined,
      showModal: false,
      currentActivity: undefined,
    }
  }

  async componentDidMount() {
    let activityPlan: ActivityPlan = await getActivities()
    for (const day of activityPlan.days) {
      day.items = day.items.filter((item: DayItem) => {
        return item.type === 'activity'
      })
    }
    let currentDay: Day | undefined
    if (this.props.match.params.id === undefined) {
      currentDay = activityPlan.days[activityPlan.current_day_index]
    } else {
      currentDay = activityPlan.days.find((day: Day) => {
        return String(day.day) === this.props.match.params.id
      })
    }
    let currentActivity : DayContent = activityPlan.days[0].items[0].content
    this.setState({
      activityPlan: activityPlan,
      currentDay: currentDay,
      currentActivity: currentActivity,
    })
  }

  onClickNavItem = (daySelected: string) => {
    return () => {
      if (this.state.activityPlan === undefined) {
        return
      }
      let currentDay: Day | undefined = this.state.activityPlan.days.find((day: Day) => {
        return String(day.day) === daySelected
      })
      this.setState({
        currentDay: currentDay,
      })
      window.location.href = `#/${daySelected}`
    }
  }

  activityClicked = (currentActivity : DayContent) => {
    return () => {
      this._showModal()
      this.setState({
        currentActivity: currentActivity,
      })
    }
  }

  private _showModal = (): void => {
    this.setState({ showModal: true })
  }

  private _closeModal = (): void => {
    this.setState({ showModal: false })
  }

  render() {
    if (this.state.activityPlan === undefined || this.state.currentDay === undefined || this.state.currentActivity === undefined) {
      return <RingLoaderWrapper />
    }
    const activityPlan: ActivityPlan = this.state.activityPlan
    const currentDay: Day = this.state.currentDay
    const currentActivity : DayContent = this.state.currentActivity
    return (
      <>
        <Modal
          titleAriaId={'Modal'}
          subtitleAriaId={'SUbtitulo'}
          isOpen={this.state.showModal}
          onDismiss={this._closeModal}
          isBlocking={false}
        >
          <div className={contentStyles.header}>
            <span>{currentActivity.name}</span>
            <IconButton
              styles={iconButtonStyles}
              iconProps={{ iconName: 'Cancel' }}
              ariaLabel="Close popup modal"
              onClick={this._closeModal as any}
            />
          </div>
          <div className={contentStyles.body}>
            <p>
              {currentActivity.description}
            </p>
          </div>
        </Modal>
        <Navbar>
          {activityPlan.days.map((day: Day) => {
            return <NavItem onClick={this.onClickNavItem(String(day.day))} key={day.day}>Day {day.day}</NavItem>
          })}
        </Navbar>
        <DayHeading>Day {currentDay.day}</DayHeading>
        <BigContainer>
          <ImagesContainer>
            {currentDay.items.map((item: DayItem) => {
              return (
                <ActivityImageContainer>
                  <ActivityImage onClick={this.activityClicked(item.content)} src={item.content.thumbnails.size1} alt='img' />
                  <ActivityImageInfo>{item.content.name}</ActivityImageInfo>
                </ActivityImageContainer>
              )
            })}
          </ImagesContainer>
        </BigContainer>
      </>
    )
  }
}
