import { Component, OnInit, OnChanges, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { PlotObject } from './plot-object.model';
import { PlotService } from '../services/plot.service';
declare var $: any;
declare const plotAccordingToChoices: any;

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html'
})
/** plot component*/
export class PlotComponent implements OnInit {
  colorArray: Array<number> = [];
  plot: any;
  plotObject: PlotObject = new PlotObject;
  plotObjects: Array<PlotObject> = [this.plotObject];
  lastActionId = "";

  constructor(private plotData: PlotService) {
    console.log("Constructor - PlotComponent");
  }

  @ViewChildren('plotChoices') choices: QueryList<any> = new QueryList;

  ngAfterViewInit() {
    this.choices.changes.subscribe(c => {
      if (this.lastActionId === "") {
        this.updatePlotData(this.plotObject.Id); //if last action is not set, this a new plot
      } else {
        this.updatePlotData(this.lastActionId); //last action is set to the solution domain on delete
        this.lastActionId = "";
      }
      console.log(c);
    });
  }

  ngOnInit() {
    this.plotData.currentPlotObjects.subscribe(plotObjects => {
      this.plotObjects = plotObjects;
    });
    this.plotData.newPlotObject.subscribe(plotObject => this.plotObject = plotObject);
    this.plotData.groupPlots = $("#group-plots").is(":checked");
  }

  updatePlotData(solutionDomain: any) {
    this.updatePlotPanels();
    var selector = '#pane-' + solutionDomain;
    $('#tab-' + solutionDomain + ' button').addClass('active');
    $(selector).addClass('active');
    $(selector).addClass('show');
    this.plotObjects.forEach(plotObject => {
      if (plotObject.Id === solutionDomain) {
        this.generatePlot(plotObject);
      }
    });
  }

  updatePlotPanels() {
    $('#plot-tabs li button').removeClass('active');
    $('#plot-column .tab-pane').removeClass('active');
    $('#plot-column .tab-pane').removeClass('show');
  }

  closeTab(plot: PlotObject) {
    var self = this;
    if (this.plotObjects) {
      this.plotObjects.forEach(function (plotObject: PlotObject, key) {
        if (plotObject.Id === plot.Id) {
          self.plotObjects.splice(key, 1);
        }
      });
      this.plotData.updatePlotData(this.plotObjects);
    }
  }

  deletePlot(plot: PlotObject, key: number) {
    var self = this;
    if (this.plotObjects) {
      this.plotObjects.forEach(function (plotObject: PlotObject) {
        if (plotObject.Id === plot.Id) {
          console.log(plotObject);
          plotObject.PlotList.splice(key, 1); //remove the plot
          self.colorArray.splice(key, 1); //delete the color from the color array so the colors remain aligned with the plots
        }
      });
      this.plotData.updatePlotData(this.plotObjects);
      this.lastActionId = plot.Id;
    }
  }

  generatePlot(plotObject: any) {
    var self = this;
    var id = plotObject.Id;
    var datasets = plotObject.PlotList;
    var i = 0;
    datasets.forEach(function (val: any, key: number) {
      if (typeof (self.colorArray[key]) !== 'undefined') {
        val.color = self.colorArray[key]; //if a value exists pull it from the color array
      } else {
        if (self.colorArray.length > 0) {
          i = self.colorArray[self.colorArray.length - 1] + 1;
        }
        val.color = i;
        self.colorArray.push(i); //create a color array so colors remain with plots when deleting plots
      }    
      ++i;
    });

    var choiceContainer = $("#choices-" + id);
    var placeholder = $("#placeholder-" + id);
    placeholder.html("");

    $("#choices-" + id + " input").bind('click',  () => {
      this.plot = plotAccordingToChoices(plotObject);
    });

    $("#spacing-" + id + " input").bind('click',  () => {
      this.plot = plotAccordingToChoices(plotObject);
    });

    if (placeholder) {
      this.plot = plotAccordingToChoices(plotObject);
    }
    if (i < 2) {
      //hide the checkbox
      $("#choices-" + id + " input").prop("disabled", true);
    }

    //set checkbox colors
    if (typeof (this.plot) !== 'undefined') {
      var series = this.plot.getData();
      choiceContainer.find("input").each(function (key: number) {
        choiceContainer.find("#color-" + key).css("background-color", series[key].color);
      });
    }

    placeholder.bind("plothover", function (pos: any, item: any) {
      var str = "(" + item.x.toFixed(2) + ", " + item.y.toFixed(2) + ")";
      $("#hoverdata").text(str);

      if (item) {
        var x = item.x.toFixed(4),
          y = item.y.toFixed(4);

        $("#tooltip").html(plotObject.Legend + " = " + "item.series.label" + " (" + x + ", " + y + ")")
          .css({ top: item.pageY + 5, left: item.pageX + 5 })
          .fadeIn(200);
      } else {
        $("#tooltip").hide();
      }
    });
    
    placeholder.bind("plotclick", function (item: any) {
      if (item) {
        $("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
        //plot.highlight(item.series, item.datapoint);
      }
    });
  }
}
