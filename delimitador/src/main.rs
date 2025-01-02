use std::env;

fn bisection_method<F>(mut a: f64, mut b: f64, f: F) -> f64
where
    F: Fn(f64) -> f64,
{
    if f(a) * f(b) >= 0.0 {
        std::process::exit(1);
    }
    let mut midpoint: f64=0.0;
    let mut num_it = 0;
    while (b-a).abs() > 0.5 {
        num_it = num_it + 1;
        midpoint = (a + b) / 2.0;
        let f_mid = f(midpoint);

        if (b - a).abs() <= 0.5 {
            return midpoint;
        }

        if f(a) * f_mid < 0.0 {
            b = midpoint;
        } else {
            a = midpoint;
        }
    }

    return midpoint;
}



fn eva(a: f64, nopat: f64, passivo: f64, pl: f64, ke: f64, ki: f64, wacc: f64) -> f64 {
    nopat - ki*passivo - ke*pl - wacc*a
}

fn cost(ki: f64, passivo: f64, ke: f64, pl: f64) -> f64 {
    -ki*passivo - ke*pl
}

fn z(a: f64, pc: u32, price: f64, p: f64) -> f64 {
    (a * (1.0 - p) - price * p * pc as f64) / (price * p * (1.0 - p) * (a + price * pc as f64 * p)).sqrt()
}

fn aprox_integral(a: f64) -> f64 {
    1.0 / (1.0 + (-(1.5976 * a + 0.07056 * a.powi(3))).exp())
}

fn f_final(
    a: f64,
    c: u32,
    nopat: f64,
    passivo: f64,
    pl: f64,
    wacc: f64,
    pc: u32,
    price: f64,
    p: f64,
    ki: f64,
    ke: f64,
) -> f64 {
    let cost_val = cost(ki, passivo, ke, pl);
    let eva_a = eva(a, nopat, passivo, pl, ke, ki, wacc);
    let eva_ac = eva(a+c as f64, nopat, passivo, pl, ke, ki, wacc);

    aprox_integral(z(a, pc, price, p)) * (eva_a - cost_val)
        - aprox_integral(z(a+c as f64, pc, price, p)) * (eva_ac - cost_val)
}


fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() != 10 {
        eprintln!("Uso: <c> <passivo> <pl> <ke> <ki> <pc> <p> <nopat> <price>");
        std::process::exit(1);
    }

    let c: u32 = args[1].parse().expect("Erro ao ler c");
    let passivo: f64 = args[2].parse().expect("Erro ao ler passivo");
    let pl: f64 = args[3].parse().expect("Erro ao ler pl");
    let ke: f64 = args[4].parse().expect("Erro ao ler ke");
    let ki: f64 = args[5].parse().expect("Erro ao ler ki");
    let pc: u32 = args[6].parse().expect("Erro ao ler pc");
    let p: f64 = args[7].parse().expect("Erro ao ler p");
    let nopat: f64 = args[8].parse().expect("Erro ao ler nopat");
    let price: f64 = args[9].parse().expect("Erro ao ler price");

    let wi = passivo / (passivo + pl);
    let we = pl / (passivo + pl);
    let wacc = wi * ki + we * ke;

    // if pc as f64*p*price/(1.0-p) < c as f64 {
    //     println!(
    //         "{}",
    //         bisection_method(0 as f64, (nopat / wacc)-pc as f64, |a| {
    //             f_final(a, c, nopat, passivo, pl, wacc, pc, price, p, ki, ke)
    //         })
    //     );    
    // }
    // else {
    //     println!(
    //         "{}",
    //         bisection_method(pc as f64*p*price/(1.0-p) - c as f64, (nopat / wacc)-pc as f64, |a| {
    //             f_final(a, c, nopat, passivo, pl, wacc, pc, price, p, ki, ke)
    //         }) / price + pc as f64
    //     );
    // }

    let limit = (pc as f64) * p / (1.0 - p);

    // Determina o valor de interval
    let interval: u32 = if (c as f64) < limit { c } else { limit as u32 };

    if z(0.0, pc, price, p) < -10.0 {
        let expr = 0.5 * (
            -((-400.0 * pc as f64 * p * price.powi(2)
                - (400.0 * pc as f64 * price.powi(2)) / (1.0 - p)
                + (400.0 * pc as f64 * price.powi(2)) / (1.0 - p).powi(2)
                - (20000.0 * price.powi(2)) / (1.0 - p)
                + (10000.0 * price.powi(2)) / (1.0 - p).powi(2)
                + 10000.0 * price.powi(2))
            .sqrt())
            - price * (-(2.0 * pc as f64) / (1.0 - p) + 2.0 * pc as f64 - 100.0 / (1.0 - p) + 100.0)
        );

        println!("{}", bisection_method(expr, nopat as f64 / wacc as f64, |a| {
                    f_final(a, interval, nopat, passivo, pl, wacc, pc, price, p, ki, ke)
            }) / price + pc as f64
        );
    }
    else {
        println!("{}", bisection_method(0.0, nopat as f64 / wacc as f64, |a| {
                        f_final(a, interval, nopat, passivo, pl, wacc, pc, price, p, ki, ke)
                }) / price + pc as f64
        );
    }

    
}
