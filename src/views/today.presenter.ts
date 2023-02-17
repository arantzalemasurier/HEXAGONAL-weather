import { mapTodayDataToViewModel, TodayViewModel, TodayData } from '../domain/today.mapper';

export interface TodayPresenter {
  presentTodayData(today: TodayData): TodayViewModel;
}

export class TodayPresenterImpl implements TodayPresenter {
  presentTodayData(today: TodayData): TodayViewModel {
    return mapTodayDataToViewModel(today);
  }
}
