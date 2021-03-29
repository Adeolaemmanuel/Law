export interface MainProps {
    navigation: any
    route: any
}

export interface MainState {
    Jobs: any[]
}

export interface PostProps extends MainProps {

}

export interface PostState extends MainState {
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
}
