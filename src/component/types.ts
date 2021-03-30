export interface MainProps {
    navigation: any
    route: any
}
export interface MainState {
    Jobs: any[]
}


export interface PostProps {
    navigation: any
    route: any
}
export interface PostState {
    Jobs: any[]
}


export interface PostVacancyProps {
    navigation: any
    route: any
}
export interface PostVacancyState {
    vacancy: any,
}


export interface PrelProps {
    navigation: any
}
export interface PerlState {
    prelim: any
    type: string[]
}


export interface JobProps {
    navigation: any
}
export interface JobState {
    Jobs: any[]
}


export interface JobDetProps {
    navigation: any
    route: any
}
export interface JobDetState {
    Details: any
}


export interface JobAppProps {
    navigation: any
    route: any
}
export interface JobAppState {
    applied: any[]
}


export interface HomeProps {
    navigation: any
    route: any
}
export interface HomeState {
    slides: any[]
    slideVisible: any
    currentIndex: number
    btnText: string
    load:boolean
    dimensions: any
}


export interface FeedProps {
    route: any,
    navigation: any
    details: any
}
export interface FeedState {
    Feed: any
    addressComponent: any
    result: string
}


export interface FeedDetProps {
    route: any,
    navigation: any
    details: any
}
export interface FeedDetState {
    Details: any
    user: string
}


export interface VacancyProps {
    route: any,
    navigation: any
    details?: any
}
export interface VacancyState {
    Details: any
    user: string
    disableBtn: boolean
    btnText: string
}


export interface AppliedProps {
    route: any,
    navigation: any
    details: any
}
export interface AppliedState {
    Details: any
    user: string
    disableBtn: boolean
    btnText: string
}


export interface DashProps {
    navigation: any
    source: any
    style: any
}
export interface DashState {
    Nav: any,
    name: string
}


export interface AgendaProps {
    navigation: any
    view: any
}
export interface AgendaState {
    selectedStartDate: any
}


export interface AddagendaProps {
    view: any
}
export interface AddagendaState {
    agendas: any
    date: any
}
