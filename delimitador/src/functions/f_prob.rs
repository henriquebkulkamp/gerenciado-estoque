/// Calculates the probability of maintaining operations based on the current stock.
///
/// This function estimates the probability that, given the available stock 'x', after a period of time and 
/// potential losses occurring, the final stock will remain above the critical point 'cp' (Critical Point).
/// In this model, each unit of stock has a probability 'p' of being lost, with the losses being independent,
/// which results in total losses following a binomial distribution~(x, p).
/// 
/// The function works as follows:
/// 1. If the available stock is less than the minimum required stock (`x < cp`), the probability of maintaining operations is 0.
/// 2. Otherwise, it calculates the mean and standard deviation of a binomial distribution using the formulas:
///    `mean = x * p` and `variance = x * p * (1 - p)`.
/// 3. It then calculates the z-score based on the difference between the available stock `x` and the minimum required stock `cp`,
///    normalizing it by the mean and the standard deviation.
/// 4. The probability of maintaining operations is then obtained through the CDF (Cumulative Distribution Function) of the 
///    standard normal distribution. The returned value represents the probability that the available stock will be sufficient 
///    to maintain operations.
///
/// # Parameters
/// 
/// - `x`: Available stock. A non-negative integer representing the number of units in stock.
/// - `cp`: Minimum required stock. A non-negative integer representing the minimum required stock to maintain operations.
/// - `p`: Probability of a unit being lost, a value between 0 and 1.
///
/// # Return
/// 
/// Returns a `f64` value representing the probability of maintaining operations. The probability is a value between 0 and 1.
///
/// # Example
/// ```
/// let x = 520;
/// let cp = 500;
/// let p = 0.1;
/// let result = probability_maintain_operations(x, cp, p);
/// println!("Probability of maintaining operations: {:.6}", result);
/// ```
/// 
/// # Note
/// This function assumes a binomial distribution but uses a normal approximation to simplify the probability calculation.
use statrs::distribution::{Normal, ContinuousCDF};

pub fn probability_maintain_operations(x: u64, cp: u64, p: f64) -> f64 {
    // If the stock is less than the critical point (cp), the probability of maintaining operations is zero
    if x < cp {
        return 0.0;
    }

    // Parameters for the approximation
    let mean = x as f64 * p;
    let variance = x as f64 * p * (1.0 - p);
    let std_dev = variance.sqrt();

    // Normal approximation
    let z_score = ((x - cp) as f64 - mean) / std_dev;
    let normal_dist = Normal::new(0.0, 1.0).unwrap();
    let cdf_value = normal_dist.cdf(z_score);

    cdf_value
}
