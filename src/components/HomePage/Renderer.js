/* eslint-disable no-param-reassign */

import bowser from 'bowser';
import color from 'color';
import RenderUtils from './RenderUtils';
import Particle from './Particle';

const lowEnd = (bowser.safari || bowser.mobile);
const lowEndIterations = 70;

/**
 * Class Renderer
 *
 * Provides the backgorund animation for the homepage
 */
class Renderer {
    /**
     * Construct an instance of a Renderer
     *
     * @param canvasId
     */
    constructor(canvasId, colors) {
        // Initialize references to the canvas object
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');

        // Set the size of the renderer to the window size
        this.setSize(window.innerWidth, window.innerHeight);

        // Re-size with window
        window.onresize = () => {
            this.setSize(window.innerWidth, window.innerHeight);

            if (lowEnd) {
                this.drawBackground();
            }
        };

        // Define default colors
        const bgColor = (lowEnd)
            ? color(colors.background).alpha(0.5).rgbString()
            : color(colors.background).rgbString();

        let backgroundColor = bgColor;

        if (colors.backgroundEnd) {
            const backgroundColorEnd = (lowEnd)
                ? color(colors.backgroundEnd).alpha(0.5).rgbString()
                : color(colors.backgroundEnd).rgbString();

            backgroundColor = this.context.createLinearGradient(0, 0, 0,
                this.context.canvas.height
            );
            backgroundColor.addColorStop(0, bgColor);
            backgroundColor.addColorStop(1, backgroundColorEnd);
        }

        const lineColor = color(colors.line);

        this.colors = {
            background: backgroundColor,
            lineEnd: lineColor.rgbString(),
            lineMidpoint: lineColor.alpha(0.1).rgbString(),
            particle: color(colors.particle).hexString(),
            ring: color(colors.ring).alpha(0.2).rgbString(),
        };

        // Entities array
        this.entities = [];

        this.minDistance = 200;

        if (lowEnd) {
            this.minDistance = 150;
        }
    }

    /**
     * Start rendering
     */
    run() {
        // RequestAnimFrame: a browser API for getting smooth animations
        RenderUtils.setupAnimFrame();

        if (lowEnd) {
            window.requestAnimFrame = (() => {
                return (callback) => {
                    window.setTimeout(callback, 2000);
                };
            })();
        }

        this.frameCount = 0;

        this.loop();
    }

    /**
     * The rendering loop
     */
    loop = () => {
        this.drawBackground();
        this.drawEntities();

        if (!lowEnd || (this.frameCount < lowEndIterations)) {
            window.requestAnimFrame(this.loop.bind(this));
        }
    }

    /**
     * Draw the canvas background
     */
    drawBackground() {
        this.context.fillStyle = this.colors.background;

        this.context.fillRect(0, 0, this.width, this.height);
    }

    /**
     * Add an entity to the micro-engine
     *
     * @param entity
     */
    addEntity(entity) {
        this.entities.push(entity);
    }

    /**
     * Keep adding entities so that the particle field doesn't die down over
     * time.
     */
    keepAlive() {
        if (this.entities.length < 40) {
            this.addEntity(new Particle(this.width, this.height, lowEnd));
        }
    }

    /**
     * Set the size of the rendering surface (canvas)
     *
     * @param width
     * @param height
     */
    setSize(width, height) {
        this.devicePixelRatio = window.devicePixelRatio || 1;

        this.backingStoreRatio = RenderUtils.getBackingStoreRatio(this.context);
        this.ratio = this.devicePixelRatio / this.backingStoreRatio;

        this.width = width;
        this.height = height;

        this.canvas.width = width;
        this.canvas.height = height;

        if (this.devicePixelRatio !== this.backingStoreRatio) {
            const { canvas } = this;
            const oldWidth = canvas.width;
            const oldHeight = canvas.height;

            canvas.width = oldWidth * this.ratio;
            canvas.height = oldHeight * this.ratio;

            canvas.style.width = `${oldWidth}px`;
            canvas.style.height = `${oldHeight}px`;

            this.context.scale(this.ratio, this.ratio);
        }
    }

    /**
     * Get the hashed key for a connection between nodes
     *
     * @param entity1
     * @param entity2
     *
     * @returns {string}
     */
    getConnectionHashKey(entity1, entity2) {
        const index1 = this.entities.indexOf(entity1);
        const index2 = this.entities.indexOf(entity2);

        if (index1 > index2) {
            return [index1, index2].join();
        }

        return [index2, index1].join();
    }

    /**
     * Draw all entities in the engine
     */
    drawEntities = () => {
        const ctx = this.context;
        const evaluatedConnections = [];

        const entityHandler = (entity) => {
            let connections = 1;

            const connectionsManager = (entity2) => {
                const hashKey = this.getConnectionHashKey(entity, entity2);

                if (evaluatedConnections[hashKey]) {
                    return;
                }

                connections += this.drawDistanceLine(
                    {
                        x: entity.x + (entity.w / 2),
                        y: entity.y + (entity.h / 2)
                    },
                    {
                        x: entity2.x + (entity2.w / 2),
                        y: entity2.y + (entity2.w / 2)
                    },
                    entity,
                    entity2
                );

                evaluatedConnections[hashKey] = true;
            };

            ctx.save();

            this.entities.forEach(connectionsManager);

            // Translate
            if (entity.x !== undefined && entity.y !== undefined) {
                ctx.translate(entity.x, entity.y);
            }

            ctx.globalAlpha = entity.opacity;

            // Render texture
            connections = (entity.previousConnections * 0.9) + (connections * 0.1);
            ctx.beginPath();
            ctx.arc(entity.w / 2, entity.h / 2, 3, 0, 2 * Math.PI, false);
            ctx.fillStyle = this.colors.particle;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(entity.w / 2, entity.h / 2, 3 * connections, 0, 2 * Math.PI, false);
            ctx.lineWidth = 1;
            ctx.strokeStyle = this.colors.ring;
            ctx.stroke();

            entity.previousConnections = connections;

            ctx.globalAlpha = 1;

            ctx.restore();

            if (entity.update !== undefined && !lowEnd) {
                entity.update();
            }

            if (this.frameCount > 150) {
                if (entity.inside(this.width, this.height)) {
                    const part = new Particle(this.width, this.height, lowEnd);

                    this.entities[this.entities.indexOf(entity)] = part;
                }

                this.frameCount = 0;
            }

            this.frameCount += 1;
        };

        this.entities.forEach(entityHandler);
    }

    /**
     * Draw the connecting line between entities
     *
     * @param p1
     * @param p2
     * @param entity1
     * @param entity2
     *
     * @returns {number}
     */
    drawDistanceLine(p1, p2, entity1, entity2) {
        let percentage = 0;
        const ctx = this.context;
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;

        const dist = Math.sqrt((dx * dx) + (dy * dy));

        // Draw the line when distance is smaller
        // then the minimum distance
        if (dist <= this.minDistance) {
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);

            percentage = 1.2 - (dist / this.minDistance);
            const percentageSafe = percentage.toFixed(2);

            ctx.globalAlpha = percentageSafe;

            gradient.addColorStop('0', this.colors.lineEnd);
            gradient.addColorStop('0.5', this.colors.lineMidpoint);
            gradient.addColorStop('1.0', this.colors.lineEnd);

            // Draw the line
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.closePath();

            ctx.globalAlpha = 1;
            // Some acceleration for the particles depending upon their distance
            const ax = dx / 200000;
            const ay = dy / 200000;

            // Apply the acceleration on the particles
            entity1.xVel -= ax;
            entity1.yVel -= ay;

            entity2.xVel += ax;
            entity2.yVel += ay;

            return percentage;
        }

        return 0;
    }

    /**
     * Initial seeding of the environment
     */
    seed() {
        const { height, width } = this;
        let count = 40;

        if (bowser.mobile) {
            count = 30;
        } else if (lowEnd) {
            count = 100;
        }

        for (let i = 0; i < count; i += 1) {
            this.addEntity(new Particle(width, height, lowEnd));
        }
    }
}

export default Renderer;
