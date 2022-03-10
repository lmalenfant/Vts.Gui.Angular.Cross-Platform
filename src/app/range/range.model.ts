import { AxisRange } from "../axis/axis-range.model";

export class Range {
  public title: string = "";
  public axis: string = "";
  public axisRange: AxisRange = {start: 0.5, stop: 9.5, count: 10};
  public startLabel: string = "";
  public startLabelUnits: string = "";
  public endLabel: string = "";
  public endLabelUnits: string = "";
  public numberLabel: string = "";
}
