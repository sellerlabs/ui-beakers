// @flow

/**
 * Class Particle
 *
 * Represents a particle in a particle system
 */
class Particle {
    x: number;
    y: number;
    w: number;
    h: number;
    xVel: number;
    yVel: number;
    opacity: number;
    previousConnections: number;
    angle: number;
    angularVel: number;

    /**
     * Construct an instance of a Particle
     *
     * @param width
     * @param height
     * @param lowEnd
     */
    constructor(width: number, height: number, lowEnd: boolean = false) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;

        this.w = 100;
        this.h = 100;

        this.xVel = 2 - (Math.random() * 4);
        this.yVel = 2 - (Math.random() * 4);

        this.opacity = 0;

        if (lowEnd) {
            this.opacity = 1;
        }

        this.previousConnections = 0;
    }

    /**
     * Update the state of the particle
     */
    update(): void {
        this.angle += this.angularVel;

        this.x += this.xVel;
        this.y += this.yVel;

        if (this.opacity < 1) {
            this.opacity += 0.05;
        }
    }

    /**
     * Check if the particle is inside an area
     *
     * @param width
     * @param height
     *
     * @returns {boolean}
     */
    inside(width: number, height: number): boolean {
        return this.x + this.w < 0 ||
            this.x > width ||
            this.y + this.h < 0 ||
            this.y > height;
    }
}

export default Particle;
