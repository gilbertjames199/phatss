declare module 'leaflet-heatmap' {
    import * as L from 'leaflet';

    interface HeatmapOverlayOptions {
        radius?: number;
        maxOpacity?: number;
        scaleRadius?: boolean;
        useLocalExtrema?: boolean;
        latField?: string;
        lngField?: string;
        valueField?: string;
    }

    class HeatmapOverlay extends L.Layer {
        constructor(options: HeatmapOverlayOptions);
        setData(data: any): void;
    }

    export default HeatmapOverlay;
}
