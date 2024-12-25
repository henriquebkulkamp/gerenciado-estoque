use std::env;

fn bisection_method<F>(mut a: f64, mut b: f64, f: F) -> f64
where
    F: Fn(f64) -> f64,
{
    // println!("a:{} -> {} b:{} -> {}", a, f(a), b, f(b));
    if f(a) * f(b) >= 0.0 {
        // eprintln!("A função não muda de sinal no intervalo [a, b].");
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
    // ((a/price - pc as f64) - a/price*p)/((a/price*p*(1.0-p))).sqrt()
    (a * (1.0 - p) - price * p * pc as f64) / (p * (1.0 - p) * (a + price * pc as f64 * p)).sqrt()
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

    // println!("a: {}", a);
    // println!("cost: {}, eva(a): {}, eva(a+c): {}", cost_val, eva_a, eva_ac);
    // println!("{}", aprox_integral(z(a, pc, price, p)));
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

    if pc as f64*p*price/(1.0-p) < c as f64 {
        println!(
            "{}",
            bisection_method(0 as f64, (nopat / wacc)-pc as f64, |a| {
                f_final(a, c, nopat, passivo, pl, wacc, pc, price, p, ki, ke)
            })
        );    
    }
    else {
        println!(
            "{}",
            bisection_method(pc as f64*p*price/(1.0-p) - c as f64, (nopat / wacc)-pc as f64, |a| {
                f_final(a, c, nopat, passivo, pl, wacc, pc, price, p, ki, ke)
            }) / price + pc as f64
        );
    }

        
}
