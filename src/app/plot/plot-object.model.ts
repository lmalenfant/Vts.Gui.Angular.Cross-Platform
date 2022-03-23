import { PlotList } from "./plot-list.model";
export class PlotObject {
  public Id: string = "";
  public Detector: string = "";
  public PlotList: Array<PlotList> = [];
  public Legend: string = "";
  public XAxis: string = "x";
  public YAxis: string = "y";

  constructor(id: string = "", detector: string = "", xAxis: string = "x", yAxis: string = "y") {
    this.Id = id;
    this.Detector = detector;
    this.Legend = detector;
    this.XAxis = xAxis;
    this.YAxis = yAxis;
  }
}
