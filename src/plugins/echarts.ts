import * as echarts from "echarts/core";
import { LegendComponent, TooltipComponent, GridComponent, TitleComponent, ToolboxComponent } from "echarts/components";
import type { LegendComponentOption, TooltipComponentOption, GridComponentOption } from "echarts/components";
import { PieChart, LineChart, BarChart, ScatterChart } from "echarts/charts";
import type { PieSeriesOption, LineSeriesOption, BarSeriesOption } from "echarts/charts";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
	TooltipComponent,
	LegendComponent,
	PieChart,
	CanvasRenderer,
	LabelLayout,
	GridComponent,
	TitleComponent,
	LineChart,
	BarChart,
	UniversalTransition,
	ScatterChart,
	ToolboxComponent,
]);

export type EChartsOption = echarts.ComposeOption<
	| TooltipComponentOption
	| LegendComponentOption
	| GridComponentOption
	| PieSeriesOption
	| LineSeriesOption
	| BarSeriesOption
>;

export default echarts;
