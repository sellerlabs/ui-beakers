// @flow

/**
 * Class RenderUtils
 *
 * Some rendering utilities
 */
class RenderUtils {
    /**
     * Setup the requestAnimFrame polyfill or alias
     */
    static setupAnimFrame(): void {
        window.requestAnimFrame = (() =>
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            }
        )();
    }

    /**
     * Get the backing store ratio
     *
     * This is used to determine whether to draw in retina mode or not on an
     * HTML canvas
     *
     * @param context
     *
     * @returns {*|number}
     */
    static getBackingStoreRatio(context: Object) {
        return context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio ||
            1;
    }
}

export default RenderUtils;
