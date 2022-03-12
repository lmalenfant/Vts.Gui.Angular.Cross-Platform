import { PlotList } from "./plot-list.model";
export class PlotObject {
  public Id: string = "";
  public Detector: string = "";
  public PlotList: Array<PlotList> = [];
  public Legend: string = "";
  public XAxis: string = "x";
  public YAxis: string = "y";
}