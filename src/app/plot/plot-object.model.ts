import { plotList } from "./plot-list.model";
export class PlotObject {
  Id: string;
  Detector: string;
  PlotList: Array<plotList>;
  Legend: string;
  XAxis: string;
  YAxis: string;
}