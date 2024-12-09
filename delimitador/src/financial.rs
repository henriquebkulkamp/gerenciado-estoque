use functions::f_prob::probability_maintain_operations;

pub struct FinancialModel {
    pub we: f64,   // We coefficient
    pub wi: f64,   // Wi coefficient
    pub nopat: f64, // Nopat value
    pub ke: f64,    // Ke coefficient
    pub ki: f64,    // Ki coefficient
    pub p: f64,     // P coefficient
    pub pl: f64,    // PL coefficient
    pub invs: f64,  // Investment value
}

impl FinancialModel {
    // Calculate PL(x) = pl + we * x
    fn pl(&self, x: f64) -> f64 {
        self.pl + self.we * x
    }

    // Calculate P(x) = p + wi * x
    fn p(&self, x: f64) -> f64 {
        self.p + self.wi * x
    }

    // Calculate ROI(x) = nopat / (invs + x)
    fn roi(&self, x: f64) -> f64 {
        self.nopat / (self.invs + x)
    }

    // Calculate LL(x) helper method
    fn ll_value(&self, roi_x: f64, x: f64) -> f64 {
        roi_x * self.pl(x) + (roi_x - self.ki) * self.p(x)
    }
    
    // Calculate LL(x) = ROI(x) * PL(x) + (ROI(x) - ki) * P(x)
    pub fn ll(&self, x: f64) -> f64 {
        let roi_x = self.roi(x);
        self.ll_value(roi_x, x)
    }

    // Calculate EVA(x) = LL(x) - ke * PL(x)
    pub fn eva(&self, x: f64) -> f64 {
        let ll_x = self.ll(x);
        ll_x - self.ke * self.pl(x)
    }    

    pub fn cost_function(&self, x:f64) -> f64 {
        self.ll(0) - self.nopat
    }

    pub fn ff(&self, x: f64) -> f64 {
        let f_cost = self.cost_function(x);
        let f_eva = self.eva(x);
        // let f_prob = 
    }
}