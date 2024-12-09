use delimitador::financial::FinancialModel;

// use functions::f_prob::probability_maintain_operations;

fn main() {
    // // Parâmetros
    // let x = 520; // Estoque disponível
    // let pc = 500; // Estoque mínimo necessário
    // let p = 0.1; // Probabilidade de perda de uma unidade

    // let result = probability_maintain_operations(x, pc, p);
    // println!("P(manter operações): {:.6}", result);

    let model = FinancialModel {
        we: 0.2,
        wi: 0.8,
        nopat: 100_000.0,
        ke: 0.1,
        ki: 0.05,
        p: 10_000.0,
        pl: 5_000.0,
        invs: 200_000.0,
    };

    let x = 0.0; 
    let ll_value = model.ll(5000000.0);

    println!("LL({}) = {}", x, ll_value);
}


// O que será feito:
// uma tela com alguma info: e que vai obter informações!
